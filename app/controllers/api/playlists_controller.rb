class Api::PlaylistController < ApplicationController
  def create
    @playlist = Playlist.new(title: params[:playlist][:title])

    if !logged_in?
      render json: ['Must log in to create playlists'], status: 401
      return
    end

    @playlist.user_id = current_user.id
    if @playlist.save
      render json: {}, status: 200
    else
      render json: @playlist.errors.full_messages, status: 422
    end
  end

  def destroy
    @playlist = Playlist.find(params[:id])

    if !@playlist
      render json: ['Playlist not found'], status: 404
    elsif @playlist.user_id != (current_user && current_user.id)
      render json: ['Invalid credentials to delete this playlist'], status: 401
    else
      @playlist.destroy
      render json: {}, status: 200
    end
  end

  def show
    @playlist = Playlist.includes(:user, tracks: [:artist])
                        .find(params[:id])

    if !@playlist
      render json: ['Playlist not found'], status: 404
    else
      render :show
    end
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title, :trackId)
  end
end
