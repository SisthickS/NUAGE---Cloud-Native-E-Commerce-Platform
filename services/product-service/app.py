from flask import Flask, jsonify
app = Flask(__name__)

products = [
    {"id": 1, "name": "Sample Product A", "price": 12.99, "stock": 10},
    {"id": 2, "name": "Sample Product B", "price": 23.50, "stock": 5},
]

@app.route("/products", methods=["GET"])
def list_products():
    return jsonify(products)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)