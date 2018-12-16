class V1::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      session[:id] = @user.id
      render :json => {status: "Success", user: {id: @user.id, name: @user.name, email: @user.email}}.to_json
    else
      render :json => {status: 'Failure'}.to_json
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

end
