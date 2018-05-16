comment_ids = []

json.set! :comments do
  @track.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :user_id, :track_id, :created_at
    end
    comment_ids << comment.id
  end
end

json.set! :track do
  json.extract! @track, :id, :title, :description
  json.createdAt @track.created_at
  json.artistId @track.artist_id
  json.numLikes @track.likes_count
  json.numPlays @track.plays_count
  json.numComments @track.comments_count
  json.audioURL @track.audio.url
  json.imageURL asset_path(@track.image.url)
  json.isLiked !!current_user && @track.is_liked_by?(current_user.id)
  json.commentIds comment_ids
end

json.set! :user do
  # json.extract! @user, :id, :username
  json.partial! 'api/users/user', user: @user
end
