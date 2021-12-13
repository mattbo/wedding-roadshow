
import json
import writer
import os.path
from pathlib import Path

OUTFILE = 'wedding_path.geojson'
MAP_FILES = '__map_files'

past = [
    'Copley Ave and Idaho St, San Diego, CA 92116',
    'Lake Murray Blvd and Mono Lake Dr, San Diego, CA 92119',
    'Cowles Mtn Blvd and Rainswept Way, San Diego, CA 92119',
    'Val Sereno Dr, Encinitas, CA',
    'North Italia, El Segundo, CA',
    'Pier Santa Barbara',
    'Santa Barbara Sunrise Rv Park',
    'Piedras Blancas Light Station',
    'Ventana Big Sur',
    '62 Point Lobos, Carmel-By-The-Sea, CA 93923',
    '1212 Forest Ave, Pacific Grove, CA',
    'Asilomar State Beach, Sunset Dr, Pacific Grove, CA',
    'Heart Shaped Rock-Love Rock, Ocean View Blvd, Pacific Grove, CA 93950',
    'Alvarado street brewing, Monterey, CA',
    'Marlow mercedes werks, Seaside, CA',
    'Las Cumbres Rd, CA 95033',
    'Eureka, Mountain View, CA',
    'Las Cumbres Rd, CA 95033',
    'San Gregorio State Beach, 20063 Cabrillo Hwy S, San Gregorio, CA 94074',
    'Jettywave Distillery, Half Moon Bay, CA',
    'San Mateo-Hayward Bridge, Foster City, CA',
    'Dimond Slice Pizza, 2208 MacArthur Blvd, Oakland, CA 94602',
    'Muth Dr, Orinda, CA',
    'Dimond Slice Pizza, 2208 MacArthur Blvd, Oakland, CA 94602',
    'Claremont Club & Spa, Berkeley, CA',
    'Dimond Slice Pizza, 2208 MacArthur Blvd, Oakland, CA 94602',
    'Balboa Ave and 26th Ave, San Francisco, CA',
    'Bolinas Beach, Unnamed Road, Bolinas, CA 94924',
    'Golden Gate View Point, Old Conzelman Rd, Mill Valley, CA',
    'Balboa Ave and 26th Ave, San Francisco, CA',
    'Dimond Slice Pizza, 2208 MacArthur Blvd, Oakland, CA 94602',
    'The Marshall Store, Marshall, CA',
    'Anchor Bay Campground, California 1, Gualala, CA',
    'Ave of the Giants, Scotia, CA',
    'Eureka, CA',
    'Yurok Loop Trail, Klamath, CA 95548',
    'Boy Scout Tree Trailhead, Crescent City, CA 95531',
    'Stout Grove Trailhead, 17 West 4th Avenue, Crescent City, CA 95531',
    'Visitor’s Center, California 95531',
    'SeaQuake Brewing, 400 Front St, Crescent City, CA 95531',
    'Harris Beach State Park, Brookings, OR',
    'Honey Bear by the Sea RV Resort and Campground, ' +
    '34161 Ophir Rd, Gold Beach, OR 97444',
    '87419 Stewart Ln, Bandon, OR 97411',
    'Charleston, OR 97420',
    'Umpqua Lighthouse State Park, Reedsport, OR 97467',
    'Beachside State Park, Waldport, OR 97394',
    'Corvallis, OR',
    'Newport, OR',
    'Pacific City, OR',
    'Netarts, OR',
    'Tillamook, OR',
    'Portland, OR',
    'Roots Wine Company, 19320 NE Woodland Loop Rd, Yamhill, OR 97148',
    'Nehalem Bay State Park, OR',
    'Cannon Beach, OR',
    'Seaside, OR',
    'Astoria, OR',
    'Grayland Beach State Park, Grayland, WA 98547',
    "Grays Harbor Lighthouse, Westport, WA",
    'Aberdeen, WA',
    'Quinault, WA 98575',
    'La Push, WA 98350',
    'Sol Duc Hot Springs Resort, Port Angeles, WA 98363',
    'Tacoma, WA',
    'Olympia, WA',
    'Millersylvania State Park, 12245 Tilley Rd SW, Olympia, WA 98512',
    'Aberdeen, WA',
    'Olympia, WA',
    'Woodinville, WA',
    'Lake Forest Park, WA',
    'Washington Park Arboretum, Arboretum Drive East, Seattle, WA',
    'Lake Forest Park, WA',
    'Queen Anne, Seattle, WA',
    'Issaquah, WA',
    'Squak Mountain, WA 98027',
    'Lake Forest Park, WA',
    'Shoreline, Seattle, WA',
    'Burien, WA',
    'Seatac International Airport, WA',
    'Lake Forest Park, WA',
    'Snoqualmie Falls, WA',
    'Fall City, WA',
    'Steel Wheel Farm, WA',
    'The Blue Heron Golf Course, WA',
    'Tolt River John MacDonald Park, WA',
    'Carnation, WA',
    'Duvall, WA',
    'Cottage Lake, WA',
    'Lake Forest Park, WA',
    'Gold Creek Pond, WA',
    'Lake Forest Park, WA',
    'Fremont Brewing, Seattle, WA',
    'KEXP, Seattle, WA',
    'Seattle Great Wheel, Seattle, WA',
    'Lake Forest Park, WA',
    'Leavenworth, WA',
    'Sun Lakes, Dry Falls State park, WA,',
    'Wilbur, WA',
    'Spokane, WA',
    'Priest River, ID',
    'Sagle, ID',
    'Sandpoint, ID',
    'Sagle, ID',
    'Thompson Falls, MT',
    'Missoula, MT',
    'Jackson Hot Springs, MT',
    'Bozeman Hot Springs, MT',
    'Yellowstone National Park North Entrance, MT',
    'Mammoth Hot Springs Hotel, Yellowstone, WY 82190',
    'Bozeman, MT',
    'Jackson, WY',
    'Taggart Lake Trailhead, Alta, WY 83414',
    'Jackson, WY',
    'Mustang Ridge Campground, Dutch John, UT 84023',
    'Ashley National Forest, US-191, Dutch John, UT 84023',
    'Cub Creek Petroglyphs, Jensen, UT 84035',
    'Aspen, CO',
    'Fort Collins, CO',
    'Boulder, CO',
    'Cheyenne Mountain State Park, CO',
    'Taos, NM',
    'Santa Fe, NM',
    'Las Cruces, NM',
    'White Sands National Monument, NM',
    'Oliver Lee Start Park, NM'
]

future = [
    'Oliver Lee Start Park, NM',
    'Guadalupe Mountains State Park, NM',
    'Carlsbad Caverns, Carlsbad, NM',
    'Marfa, TX',
    'Big Bend National Park, TX',
    'Austin, TX',
    'Galveston, TX',
    'New Orleans, LA',
    'Atlanta, GA',
    'Savannah, GA',
    'Spartanburg, SC',
    'Charlotte, NC',
    'Ashville, NC',
    'Washington, DC',
    'Bethany Beach, DE',
    'Asbury Park, NJ',
    'New York, NY',
    'Kingston, NY',
    'Providence, RI',
    'Boston, MA',
    'Nashua, NH',
    'Burlington, VT',
    'Portland, ME',
    'Quebec City, Quebec, Canada',
    'Montreal, Canada',
    'North Bay, Ontario, Canada',
    'Saulte Ste. Marie, Ontario, Canada',
    'Little Beaver Lake Campground, Burt Township, MI 49884',
    'Milwaukee, WI',
    'Madison, WI',
    'Minneapolis, MN',
    'Madeleine Island, WI',
    'Ashland, WI',
    'Minneapolis, MN',
    'Iowa City, IA',
    'Chicago, IL',
    'Watertown WI',
]


def gen_filename(start, end, idx):
    s = start[:10].replace(', ', '_').replace(' ', '_').replace(',', '_')
    e = end[:10].replace(', ', '_').replace(' ', '_').replace(',', '_')
    return (f"{idx:0>5}_{s}_to_{e}")


for p_idx in range(len(past)-1):
    fname = gen_filename(past[p_idx], past[p_idx+1], p_idx)
    if(not os.path.exists(os.path.join(MAP_FILES, fname))):
        route_writer = writer.Writer()
        route_writer.query(past[p_idx], past[p_idx+1], custom_label='past')
        p = list(Path(MAP_FILES).glob(f"{fname[:fname.index('_')]}_*"))
        if len(p) > 0:
            print(f"Removing expired files:\n{p}")
            [f.unlink() for f in p]
        p = list(Path(MAP_FILES).glob(f"*{fname[fname.index('_'):]}"))
        if len(p) > 0:
            print(f"Removing travelled files:\n{p}")
            [f.unlink() for f in p]
        route_writer.save(os.path.join(MAP_FILES, fname))

    print(f"Finished {past[p_idx]} to {past[p_idx+1]}")

f_start = len(past) + 10000
print(f"f_start : {f_start})")
for f_idx in range(len(future)-1):
    fname = gen_filename(future[f_idx], future[f_idx+1], f_start+f_idx)
    if(not os.path.exists(os.path.join(MAP_FILES, fname))):
        route_writer = writer.Writer()
        route_writer.query(future[f_idx], future[f_idx+1],
                           custom_label='future')
        p = list(Path(MAP_FILES).glob(f"{fname[:fname.index('_')]}_*"))
        if len(p) > 0:
            print(f"Removing expired files:\n{p}")
            [f.unlink() for f in p]
        route_writer.save(os.path.join(MAP_FILES, fname))

    print(f"Finished {future[f_idx]} to {future[f_idx+1]}")

p = Path(MAP_FILES)
files = sorted(list(p.glob("[0-9][0-9][0-9][0-9][0-9]_*")))
geojson = {"type": "FeatureCollection", "features": []}
for f in files:
    print(f"appending {f}")
    with open(f, 'r') as infile:
        j = json.load(infile)
        geojson['features'].append(j['features'][0])

with open(OUTFILE, 'w') as out:
    json.dump(geojson, out)
