comment_ids = []

json.comments do
  @user.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :user_id, :track_id, :created_at
    end
    comment_ids << comment.id
  end
end

json.set! :user do
  json.extract! @user, :username, :id
  json.imageURL asset_path(@user.image.url)
  json.trackIds @user.track_ids
  json.likedIds @user.liked_tracks.pluck(:id)
  json.listenedIds @user.listened_track_ids.uniq
  json.commentIds comment_ids
end

json.set! :tracks do
  @user.tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :title, :description
      json.artistId track.artist_id
      json.createdAt track.created_at
      json.numLikes track.likes_count
      json.numListens track.plays_count
      json.audioURL track.audio.url
      json.imageURL asset_path(track.image.url)
      json.isLiked false
    end
  end

  @user.listened_tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :title, :description
      json.artistId track.artist_id
      json.createdAt track.created_at
      json.numLikes track.likes_count
      json.numListens track.plays_count
      json.audioURL track.audio.url
      json.imageURL asset_path(track.image.url)
      json.isLiked false
    end
  end

  @user.liked_tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :title, :description
      json.artistId track.artist_id
      json.createdAt track.created_at
      json.numLikes track.likes_count
      json.numListens track.plays_count
      json.audioURL track.audio.url
      json.imageURL asset_path(track.image.url)
      json.isLiked true
    end
  end
end

# json.isLiked !!current_user && track.is_liked_by?(current_user.id)
