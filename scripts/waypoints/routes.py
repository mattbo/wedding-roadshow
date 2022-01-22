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
        if not self.ALL_SEGS:
            print("Loading all segments from files")
            self.ALL_SEGS = Segment.load_all()

        seg_hash = Segment.get_hash(start_loc, end_loc)
        s = list(filter(lambda x: x.seg_hash == seg_hash, self.ALL_SEGS))
        if len(s) > 1:
            raise ValueError(f"Hash collision for {start_loc} to {end_loc}")
        if len(s) == 1:
            print(f"Cached: {start_loc} to {end_loc}")
            return self.segments.append(s)

        # create a new Segment
        s = Segment(start_loc, end_loc, seg_hash)
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
                geojson['features'].append(s.features[0])

        with open(OUTFILE, 'w') as out:
            json.dump(geojson, out)
