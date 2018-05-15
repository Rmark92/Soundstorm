class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.includes(:tracks)
                .includes(:liked_tracks)
                .includes(:listened_tracks)
                .includes(:comments)
                .find(params[:id])
    # @user = User.find(params[:id])
    # @tracks = @user.tracks
    render 'api/users/show_full'
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
