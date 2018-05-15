class CommentsController < ApplicationController

  def index
    @track = Track.find_by(params[:track_id])
    @comments = @track.comments.includes(:users)

  end

  def create
  end

  def destroy
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
