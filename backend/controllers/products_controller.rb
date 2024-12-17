require_relative '../database_operations'

class ProductsController < Sinatra::Base
  configure do
    enable :cross_origin
  end

  before do
    content_type :json
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
  end

  options "*" do
    response.headers["Allow"] = "GET, HEAD, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"
    200
  end

  # GET paginated products
  get '/api/products' do
    page = (params[:page] || 1).to_i
    per_page = 12

    products = DatabaseOperations.get_all_products
    total_products = Product.count
    total_pages = (total_products.to_f / per_page).ceil

    {
      products: products.map(&:to_h),
      total_pages: total_pages,
      current_page: page
    }.to_json
  end

  # GET a single product
  get '/api/products/:id' do
    product = DatabaseOperations.get_product(params[:id])
    halt 404, { error: 'Product not found' }.to_json if product.nil?
    product.to_json
  end

# POST create a new product
  post '/api/products' do
    data = JSON.parse(request.body.read)
    new_id = DatabaseOperations.create_product(data)
    { id: new_id, message: 'Product created successfully' }.to_json
  end

  # PUT update a product
  put '/api/products/:id' do
    data = JSON.parse(request.body.read)
    DatabaseOperations.update_product(params[:id], data)
    { message: 'Product updated successfully' }.to_json
  end

  # DELETE a product
  delete '/api/products/:id' do
    DatabaseOperations.delete_product(params[:id])
    { message: 'Product deleted successfully' }.to_json
  end

  # POST seed sample products
  post '/api/seed' do
    DatabaseOperations.purge_products  # Clear existing products
    50.times do |i|
      DatabaseOperations.create_product(
        title: "Product #{i+1}",
        description: "This is the description for product #{i+1}",
        price: rand(10.0..100.0).round(2),
        image_url: "https://via.placeholder.com/150?text=Product#{i+1}",
        stock: rand(0..50)
      )
    end
    { message: "50 sample products inserted" }.to_json
  end

  # GET search products
  get '/api/products/search/:term' do
    results = DatabaseOperations.search_products(params[:term])
    { results: results }.to_json
  end

  # GET low stock products
  get '/api/products/low_stock/:threshold?' do
    threshold = params[:threshold] ? params[:threshold].to_i : 5
    low_stock = DatabaseOperations.get_low_stock_products(threshold)
    { low_stock_products: low_stock }.to_json
  end
end
