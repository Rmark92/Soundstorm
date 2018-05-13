json.extract! user, :username, :id
if user.image.url
  json.imageURL asset_path(user.image.url)
end
