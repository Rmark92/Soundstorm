class Api::SearchController < ApplicationController
  def index
    @results = PgSearch.multisearch(params[:query]).includes(:searchable).limit(5)
  end
end
