comment_ids = []

json.set! :comments do
  @track.comments.each do |comment|
    json.set! comment.id do
      json.partial! 'api/comments/comment', comment: comment
    end
    comment_ids << comment.id
  end
end

json.set! :track do
  json.partial! 'api/tracks/track', track: @track
  json.isLiked @is_liked
  json.commentIds comment_ids
end

json.set! :users do
  json.set! @track.artist.id do
    json.partial! 'api/users/user', user: @track.artist
  end
  @track.comments.each do |comment|
    json.set! comment.user.id do
      json.partial! 'api/users/user', user: comment.user
    end
  end
end
