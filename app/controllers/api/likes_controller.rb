class Api::LikesController < ApplicationController
  def create
    @like = Like.new({ track_id: params[:track_id] })
    @like.user_id = current_user.id

    if @like.save
      head :no_content
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    @like = Like.find_by({ track_id: params[:track_id], user_id: current_user.id })

    if @like
      @like.destroy
      head :no_content
    else
      render json: ['Like not found'], status: 404
    end
  end
end
