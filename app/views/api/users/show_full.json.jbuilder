comment_ids = []

json.comments do
  @user.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :user_id, :track_id
      json.createdAt :created_at
    end
    comment_ids << comment.id
  end
end

json.set! :user do
  json.extract! @user, :username, :id
  json.imageURL asset_path(@user.image.url)
  json.trackIds @user.track_ids
  json.numTracks @user.tracks_count
  json.likedIds @user.liked_tracks.pluck(:id)
  json.listenedIds @user.listened_track_ids.uniq
  json.commentIds comment_ids
end

json.set! :tracks do
  @user.tracks.each do |track|
    json.set! track.id do
      json.partial! 'api/tracks/track', track: track
    end
  end

  @user.listened_tracks.each do |track|
    json.set! track.id do
      json.partial! 'api/tracks/track', track: track
    end
  end

  @user.liked_tracks.each do |track|
    json.set! track.id do
      json.partial! 'api/tracks/track', track: track
      json.isLiked true
    end
  end
end
