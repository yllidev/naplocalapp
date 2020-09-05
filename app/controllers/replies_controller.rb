class RepliesController < ApplicationController
    # before_action :authenticate_user!
    before_action :set_reply, only: [:show, :update]
    respond_to :json

    def index
        @request = Request.find(params[:request_id])
        # your reply is going to be as a start conversation
        # @replies = Reply.all

        # @filtered = @replies.select do |reply|
        #     reply.request_id == @request.id
        # end
        

        render json: @request.conversations
    end

    def show
        render json: @reply
    end

    def create
        request = Request.find(params[:request_id])
        fulfilment = FulfilmentRequester.create(request_id: params[:request_id], creator_id: request.user_id, requester_id: params[:volunteer_id]) if request.present?
        # fulfilment.update(requester_id: params[:volunteer_id]) if fulfilment.present?
        # it doesn't make sence to create reply with data
        # @reply = Reply.new
        #@reply.volunteer_id = current_user.id
        # @reply.save!
        render json: {}, :status=>201
    end

    def update
        @reply.update(reply_params)
        head :no_content
    end

    private
    def reply_params
        params.require(:reply)
    end

    def set_reply
        @reply = Reply.find(params[:id])
    end
end
