class PagesController < ApplicationController
  def index
  end

  def show
    #if valid_page?
       render template: "pages/#{params[:single_page]}"
     #else render file: "public/404.html", status: :not_found
     #end
  end
end

 private

 def valid_page?
       File.exist?(Pathname.new(Rails.root + "app/views/pages/#{params[:single_page]}.html.erb"))
end
