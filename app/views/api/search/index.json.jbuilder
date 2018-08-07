json.array! @results do |result|
    type = result.searchable_type
    json.type type
    name = case type
           when 'User' then result.searchable.username
           when 'Track' then result.searchable.title
           end
    json.name name
    json.imageURL asset_path(result.searchable.image.url)
    json.id result.searchable.id
end
