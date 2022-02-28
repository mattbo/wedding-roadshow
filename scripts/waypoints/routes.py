###
# A Route is an ordered series of Segments.
# Not really needed until we build a database?
###

# from typing import List
from dataclasses import dataclass, field
from segments import Segment
import json

OUTFILE = 'wedding_path.geojson'


@dataclass
class Route():
    segments: list[Segment] = field(default_factory=list)
    name: str = None
    label: str = None  # stored with segments, used for CSS

    ALL_SEGS = False  # class variable

    def find_or_create_segment(self, start_loc, end_loc):
        if self.ALL_SEGS is False:
            print("Loading all segments from files")
            self.ALL_SEGS = Segment.load_all()
            print(f"Found {len(self.ALL_SEGS)} segments")

        s = list(filter(lambda x:
                        (x.start_loc == start_loc) and (x.end_loc == end_loc),
                        self.ALL_SEGS))
        if len(s) > 1:
            print("Matched the following files:")
            for seg in s:
                print(Segment.get_fname(seg.seg_id))
            print("Picking the first match...")
            return self.segments.append(s[0])
        if len(s) == 1:
            print(f"Cached: {start_loc} to {end_loc}")
            return self.segments.append(s[0])

        # create a new Segment
        print("No luck, building from scratch")
        s = Segment(start_loc, end_loc)
        print(f"Generating: {start_loc} to {end_loc}")
        s.get_route(self.label)
        s.save()
        return self.segments.append(s)

    def load_segments(self):
        for s in self.segment_ids:
            self.segment_data.append(Segment.load(Segment.get_fname(s)))

    @classmethod
    def write_geojson(cls, outfile, routes):
        geojson = {"type": "FeatureCollection", "features": []}
        for r in routes:
            for s in r.segments:
                if r.label:
                    # Check for custom label on the route (past / future)
                    s.features[0]['properties']['name'] = r.label
                geojson['features'].append(s.features[0])

        with open(OUTFILE, 'w') as out:
            json.dump(geojson, out)
