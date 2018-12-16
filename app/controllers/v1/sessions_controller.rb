class V1::SessionsController < ApplicationController

  def create
    @user = User.find_by(email: params[:email])
    if (@user != nil) && (@user.authenticate(params[:password]))
      session[:user_id] = @user.id
      render :json => {status: "Success", user: {id: @user.id, name: @user.name, email: @user.email}}.to_json
    else
      render :json => {status: 'Failed', message: "Email and/or Password are incorrect."}
    end
  end

  def destroy
    session.delete :user_id
    render :json => {status: 'Success'}
  end

end
