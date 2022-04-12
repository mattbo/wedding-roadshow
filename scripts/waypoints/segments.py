###
# A segment is a route from start_location to end_location.  It can have:
#  - a start date
#  - a duration (drive time)
#  - associated GeoJSON
#  - an ID (numeric, consecutive, filename)
###
import os
import requests
import polyline
import json
from dataclasses import dataclass, asdict, field
from datetime import date

SEGMENT_DIR = './segments'


@dataclass
class Segment():
    start_loc: str
    end_loc: str
    start_date: date = None
    seg_id: int = None
    features: list = field(default_factory=list)
    avoid: str = 'highways'  # format multiples as "highways|ferries|tolls"
    # seg_hash: Optional[str]

    MAX_SEGMENT_ID = 0  # class attribute

    def save(self):
        # Save this segment as a file
        # The s_id should be the next consecutive segment_id
        # Somehow, this should be atomic...
        Segment.MAX_SEGMENT_ID += 1
        self.seg_id = Segment.MAX_SEGMENT_ID

        segment = asdict(self)
        fname = self.get_fname(self.seg_id)
        print(f"Saving {fname}: {self.start_loc} to {self.end_loc}")
        with open(fname, 'w') as out:
            json.dump(segment, out)

    def get_route(self, custom_label=None):
        payload = {'origin': self.start_loc,
                   'destination': self.end_loc,
                   'avoid': self.avoid,
                   'key': os.environ['FIREBASE_APIKEY']}
        request_url = 'https://maps.googleapis.com/maps/api/directions/json'
        try:
            r = requests.get(request_url, params=payload)
            r.raise_for_status()  # throw errors on HTTP errors
            results = r.json()
            route = results['routes'][0]['overview_polyline']['points']
            coords = polyline.decode(route)
        except Exception as e:
            print("Error querying for directions for {0} TO {1} -- {2}"
                  .format(self.start_loc, self.end_loc, str(e)))
            print("Requests error: {0}".format(r.text))
            raise e
            return

        # reverse order to comply with geojson spec
        coords_list = [[lon, lat] for lat, lon in coords]

        default_name = "{0} to {1}".format(self.start_loc, self.end_loc)

        self.features.append({
            "type": "Feature",
            "properties": {
                "name": custom_label or default_name
            },
            "geometry": {
                "type": "MultiLineString",
                "coordinates": [coords_list]
            }
        })
        return [[lat, lon] for lat, lon in coords]

    @classmethod
    def get_fname(cls, s_id):
        return os.path.join(SEGMENT_DIR, f"{s_id:0>7}")

    @classmethod
    def load_by_id(cls, s_id):
        if int(s_id) > cls.MAX_SEGMENT_ID:
            cls.MAX_SEGMENT_ID = int(s_id)
        fname = cls.get_fname(s_id)
        return cls.load_by_path(fname)

    @classmethod
    def load_by_path(cls, fname):
        with open(fname, 'r') as infile:
            seg_data = json.load(infile)
        return cls(**seg_data)

    @classmethod
    def load_all(cls):
        segments = []
        for seg in os.listdir(SEGMENT_DIR):
            segments.append(cls.load_by_id(seg))
        return segments

    @classmethod
    def cleanup(cls):
        for seg in os.listdir(SEGMENT_DIR):
            print(f"Checking segment {seg}")
            fname = cls.get_fname(seg)
            with open(fname, 'r') as infile:
                d = json.load(infile)
            if 'seg_hash' in d.keys():
                print("found hash")
                del(d['seg_hash'])
            else:
                print("no hash")
            segment = asdict(cls(**d))
            with open(fname, 'w') as out:
                json.dump(segment, out)


if __name__ == '__main__':
    Segment.cleanup()
