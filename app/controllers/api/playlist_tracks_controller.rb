class PlaylistTracksController < ApplicationController
  def create
    playlist_track = PlaylistTracks.new(playlist_id: params[:playlist_id],
                                        track_id: params[:track_id])
    playlist = Playlist.find(params[:playlist_id])

    if !playlist
      render json: ['Playlist does not exist'], status: 404
    elsif playlist.user_id != (current_user && current_user.id)
      render json: ['Invalid credentials to add to this playlist'], status: 401
      return
    elsif playlist_track.save
      render json: {}, status: 200
    else
      render json: playlist_track.errors.full_messages, status: 422
    end
  end

  def destroy
    playlist_track = PlaylistTracks.new(playlist_id: params[:playlist_id],
                                        track_id: params[:track_id])
    playlist = Playlist.find(params[:playlist_id])

    if !playlist
      render json: ['Playlist does not exist'], status: 404
    elsif playlist.user_id != (current_user && current_user.id)
      render json: ['Invalid credentials to remove track from this playlist'], status: 401
      return
    elsif playlist_track.destroy
      render json: {}, status: 200
    else
      render json: playlist_track.errors.full_messages, status: 422
    end
  end
end
