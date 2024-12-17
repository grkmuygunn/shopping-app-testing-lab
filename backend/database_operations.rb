require_relative 'config/database'
require 'json'

module DatabaseOperations
  class << self
    def get_all_products
      DB.execute("SELECT * FROM products")
    end
    # products = DatabaseOperations.get_all_products

    def get_product(id)
      DB.execute("SELECT * FROM products WHERE id = ?", [id]).first
    end
    # product = DatabaseOperations.get_product(1)

    def update_product(id, attributes)
      set_clause = attributes.keys.map { |key| "#{key} = ?" }.join(", ")
      query = "UPDATE products SET #{set_clause} WHERE id = ?"
      DB.execute(query, attributes.values + [id])
    end
    # DatabaseOperations.update_product(1, { price: 29.99, stock: 100 })

    def delete_product(id)
      DB.execute("DELETE FROM products WHERE id = ?", [id])
    end
    # DatabaseOperations.delete_product(1)

    def purge_products
      DB.execute("DELETE FROM products")
    end
    # DatabaseOperations.purge_products

    def create_product(attributes)
      columns = attributes.keys.join(", ")
      placeholders = Array.new(attributes.length, "?").join(", ")
      query = "INSERT INTO products (#{columns}) VALUES (#{placeholders})"
      DB.execute(query, attributes.values)
      DB.last_insert_row_id
    end
    # new_id = DatabaseOperations.create_product({
    # title: "New Product",
    # description: "A great new product",
    # price: 19.99,
    # image_url: "https://example.com/image.jpg",
    # stock: 50
    # })

    def search_products(term)
      DB.execute("SELECT * FROM products WHERE title LIKE ? OR description LIKE ?", ["%#{term}%", "%#{term}%"])
    end
    # results = DatabaseOperations.search_products("shirt")

    def get_low_stock_products(threshold = 5)
      DB.execute("SELECT * FROM products WHERE stock <= ?", [threshold])
    end
    # low_stock = DatabaseOperations.get_low_stock_products(10)

    def bulk_update_prices(multiplier)
      DB.execute("UPDATE products SET price = price * ?", [multiplier])
    end
    # % increase
    # DatabaseOperations.bulk_update_prices(1.1)

    def export_to_json(filename = 'products_export.json')
      products = get_all_products
      File.write(filename, JSON.pretty_generate(products))
    end
    # DatabaseOperations.export_to_json('my_products_export.json')

    def import_from_json(filename = 'products_import.json')
      products = JSON.parse(File.read(filename))
      products.each do |product|
        create_product(product)
      end
    end
    # DatabaseOperations.import_from_json('my_products_import.json')
  end
end