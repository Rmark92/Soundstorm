class Api::ListensController < ApplicationController
  def create
    @listen = Listen.new(listens_params)

    if @listen.save
      render json: {}, status: 200
    else
      render json: @listen.errors.full_messages, status: 422
    end
  end

  def destroy
    @listen = Listen.find(params[:id])
    @listen.destroy
    render status: 200
  end

  private

  def listens_params
    params.require(:listen).permit(:user_id, :track_id)
  end
end
