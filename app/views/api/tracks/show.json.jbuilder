json.set! :track do
  json.extract! @track, :id, :title, :description
  json.createdAt @track.created_at
  json.artistId @track.artist_id
  json.numLikes @track.likes_count
  json.numPlays @track.plays_count
  json.audioURL @track.audio.url
  json.imageURL asset_path(@track.image.url)
  json.isLiked !!current_user && @track.is_liked_by?(current_user.id)
end

json.set! :user do
  # json.extract! @user, :id, :username
  json.partial! 'api/users/user', user: @user
end
