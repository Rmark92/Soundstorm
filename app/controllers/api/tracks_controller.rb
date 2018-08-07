class Api::TracksController < ApplicationController

  def index
    if params['trackSort']
      @tracks = Track.retrieve_with_sort(params['trackSort']).includes(:artist)
    else
      @tracks = Track.includes(:artist, :likes).all
    end
    @liked_tracks = current_user ? current_user.liked_tracks.pluck(:id) : []
  end

  def show
    @track = Track.includes(:artist, comments: [:user])
                  .find(params[:id])
    @is_liked = current_user && current_user.liked_tracks.exists?(@track.id)
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

  def destroy
    @track = Track.find(params[:id])
    if @track.destroy
      render json: { trackId: @track.id, userId: @track.artist_id }
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  private

  def track_params
    params.require(:track).permit(:title, :audio, :image, :description)
  end
end
