json.set! :track do
  json.extract! @track, :id, :title, :artist_id
  json.audio_url @track.audio.url
  json.image_url @track.image.url
end

json.set! :user do
  json.extract! @user, :id, :username
end
