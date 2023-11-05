#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
from uuid import uuid4
app = Flask(__name__)



@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/101-hbnb/', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    h_states = storage.all(State).values()
    h_states = sorted(h_states, key=lambda k: k.name)
    hst_ct = []

    for state in h_states:
        hst_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    h_amenities = storage.all(Amenity).values()
    h_amenities = sorted(h_amenities, key=lambda k: k.name)

    h_places = storage.all(Place).values()
    h_places = sorted(h_places, key=lambda k: k.name)

    return render_template('101-hbnb.html',
                           h_states=hst_ct,
                           h_amenities=h_amenities,
                           h_places=h_places,
                           cache_id=str(uuid4()))


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000, debug=True)
