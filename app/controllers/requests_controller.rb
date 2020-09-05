class RequestsController < ApplicationController
    #     before_action :authenticate_user!
        before_action :set_request, only: [:show, :update, :destroy]
        respond_to :json

        def index
            @requests = Request.all
            render json: @requests.as_json(methods: [:replied_user_ids, :last_replied_within_day])
        end

        def show
            render json: @requests
        end

        def create
            #@request = Request.create!(request_params)
            @request = Request.new(request_params)
    #         @request.user_id = current_user.id

            if @request.save!
                # FulfilmentRequester.create(request_id: @request.id, creator_id: @request.user_id)
            end
            render json: @request, :status => 201
        end

        def update
            if params[:limit] == 5
                fulfilment = FulfilmentRequester.where(request_id: @request.id)
                if fulfilment.present?
                    if fulfilment.count == 5
                        @request.update(limit: 5)
                    end
                end
            else
                @request.update(request_params)
            end
            head :no_content
        end

        def destroy
            @request.destroy
            head :no_content
        end

        def replies
            @request = Request.find(params[:id])
            render json: @request&.user&.conversations&.count, :status => 201
        end


        private
        def request_params
            params.permit(:latitude, :longitude, :fulfilled, :description, :user_id, :request_category_id, :limit)
        end

        def set_request
            @request = Request.find(params[:id])
        end
    end
