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

  def update
    @user = User.find(params[:id])

    if @user.update(update_params)
      render :update
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.includes(:tracks, :liked_tracks,
                          :listened_tracks, :comments)
                .find(params[:id])
    render 'api/users/show_full'
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

  def update_params
    params.require(:user).permit(:image)
  end
end
