require 'sinatra'
require 'sinatra/cors'
require 'json'
require 'sqlite3'
require_relative 'config/database'
require_relative 'models/product'
require_relative 'controllers/products_controller'
require_relative 'database_operations'

# CORS configuration
configure do
  enable :cross_origin
end

set :allow_origin, "http://localhost:3000"
set :allow_methods, "GET,HEAD,POST,OPTIONS"
set :allow_headers, "content-type,if-modified-since"
set :expose_headers, "location,link"

before do
  response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
end

options "*" do
  response.headers["Allow"] = "GET, HEAD, POST, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"
  200
end

# Use the ProductsController for product-related routes
use ProductsController

# Error handling
not_found do
  content_type :json
  status 404
  { error: 'Not Found' }.to_json
end

error do
  content_type :json
  status 500
  { error: 'Internal Server Error' }.to_json
end