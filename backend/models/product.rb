class Product
    attr_reader :id, :title, :description, :price, :image_url, :stock
  
    def initialize(attributes)
      @id = attributes['id']
      @title = attributes['title']
      @description = attributes['description']
      @price = attributes['price']
      @image_url = attributes['image_url']
      @stock = attributes['stock']
    end
  
    def to_h
      {
        id: @id,
        title: @title,
        description: @description,
        price: @price,
        image_url: @image_url,
        stock: @stock
      }
    end
  
    def self.all(page: 1, per_page: 12)
      offset = (page - 1) * per_page
      products = DB.execute("SELECT * FROM products LIMIT ? OFFSET ?", [per_page, offset])
      products.map { |product_data| new(product_data) }
    end
  
    def self.find(id)
      product_data = DB.execute("SELECT * FROM products WHERE id = ?", [id]).first
      new(product_data) if product_data
    end
  
    def self.count
      DB.get_first_value("SELECT COUNT(*) FROM products")
    end
  
    def self.create(attributes)
      DB.execute(
        "INSERT INTO products (title, description, price, image_url, stock) VALUES (?, ?, ?, ?, ?)",
        [attributes[:title], attributes[:description], attributes[:price], attributes[:image_url], attributes[:stock]]
      )
      DB.last_insert_row_id
    end
  end