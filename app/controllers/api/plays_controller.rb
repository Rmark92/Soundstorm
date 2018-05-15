class Api::PlaysController < ApplicationController
  def create
    @play = Play.new({ track_id: params[:track_id] })
    @play.user_id = current_user.id

    if @play.save
      render json: {}, status: 200
    else
      render json: @play.errors.full_messages, status: 422
    end
  end
end
