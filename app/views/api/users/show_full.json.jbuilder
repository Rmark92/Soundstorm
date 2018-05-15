json.set! :user do
  json.extract! @user, :username, :id
  json.imageURL asset_path(@user.image.url)
  json.trackIds @tracks.pluck(:id)
end

json.set! :tracks do
  @tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :title, :description
      json.artistId track.artist_id
      json.createdAt track.created_at
      json.numLikes track.likes_count
      json.numListens track.plays_count
      json.audioURL track.audio.url
      json.imageURL asset_path(track.image.url)
      json.isLiked !!current_user && track.is_liked_by?(current_user.id)
    end
  end
end
