class Api::TracksController < ApplicationController
  def index
  end

  def show
    @track = Track.find(params[:id])
    @user = @track.artist
  end

  def create
    @track = Track.new(track_params)
    @track.artist_id = current_user.id

    if @track.save
      @track = Track.last
      @user = current_user
      render :show
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def update
  end

  def destroy
  end

  private

  def track_params
    params.require(:track).permit(:title, :audio, :image, :description)
  end
end
