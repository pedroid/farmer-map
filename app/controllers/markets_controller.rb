class MarketsController < ApplicationController
  def index
    @markets = Market.all
  end
  def new
    @market = Market.new
  end
  
end
