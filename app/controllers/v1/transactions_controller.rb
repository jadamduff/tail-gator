class V1::TransactionsController < ApplicationController

  Braintree::Configuration.environment = :sandbox
  Braintree::Configuration.logger = Logger.new('log/braintree.log')
  Braintree::Configuration.merchant_id = 'qvf87y36x4854wcv'
  Braintree::Configuration.public_key = 'vwtb9gyky7n3j2gs'
  Braintree::Configuration.private_key = '5dc4a31ebefa1a564d60dd5b149f5ee5'

  def client_token
    @client_token = Braintree::ClientToken.generate
    render :json => {client_token: @client_token}
  end

  def create
    result = Braintree::Transaction.sale(
      :amount => params[:amount],
      :payment_method_nonce => params[:payment_method_nonce],
      :options => {
        :submit_for_settlement => true
      }
    )

    if result.success?
      render :json => {status: 'Paid'}
    else
      render :json => {status: 'Failed'}
    end
  end

end
