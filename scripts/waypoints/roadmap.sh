. ../venv/bin/activate

echo "building route"
if [ -f ../../.env.development ]
then
    export $(cat ../../.env.development | sed 's/#.*//g' | xargs)
else
    echo "Could not find ../../.env.development"
    echo "need the FIREBASE_APIKEY to call Google Maps"
fi
python3 waypoints.py

echo "copying json"
cp wedding_path.geojson ../../static/wedding_path.json
