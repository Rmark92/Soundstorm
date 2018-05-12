json.set! :track do
  json.extract! @track, :id, :title, :description
  json.createdAt @track.created_at
  json.artistId @track.artist_id
  json.audioURL @track.audio.url
  json.imageURL @track.image.url
end

json.set! :user do
  json.extract! @user, :id, :username
end
