from flask import Flask, request, jsonify
import googlemaps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# TROCAR PARA A SUA KEY DA API DO GOOGLE PLACES
gmaps = googlemaps.Client(key='DIGITAR_SUA_KEY_DA_API_PLACES')

@app.route('/search', methods=['POST'])
def search_places():
    query = request.form.get('query')

    places = gmaps.places(query)

    formatted_places = []
    for place in places['results']:
        name = place['name']
        address = place.get('formatted_address', 'N/A')
        phone = place.get('formatted_phone_number', 'N/A')
        website = place.get('website', 'N/A')
        snippet = place.get('formatted_address', 'N/A')

        formatted_places.append({
            'name': name,
            'address': address,
            'phone': phone,
            'website': website,
            'snippet': snippet
        })

    return jsonify({'places': formatted_places})

if __name__ == '__main__':
    app.run(debug=True)
