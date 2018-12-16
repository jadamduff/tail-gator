class V1::TestController < ApplicationController
  
  def test_data
    render :json => {name: 'Adam Duff', message: 'Welcome'}.to_json
  end

end
