json.user do
  json.id @user.id
  json.imageURL asset_path(@user.image.url)
end
