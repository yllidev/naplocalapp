class UsersController < ApplicationController
        # before_action :authenticate_user!
        before_action :set_user, only: [:show, :destroy]
        respond_to :json

        def index
            @conversation = Conversation.find(params[:conversation_id])
            @users = User.all
            @filtered = @users.select do |user|
                user.conversation_ids.include?(@conversation.id)
            end
            @filter = {}
            @filtered.each_with_index do |u, index|
              @filter[u.id] = {}
              if u.image.attached?
                @filter[u.id].merge!(JSON.parse(u.to_json).merge!({image: Rails.application.routes.url_helpers.rails_blob_path(u.image, only_path: true)}))
              else
                @filter[u.id].merge!(JSON.parse(u.to_json))
              end
            end
            render json: @filter
        end

        def show
            render json: @user
        end

        def get_user
          @user = User.find(params[:id]) || nil
          @image = ''
          @userName = @user.first_name.to_s + ' ' + @user.last_name.to_s
          if @user && @user.image.attached?
            @image = Rails.application.routes.url_helpers.rails_blob_path(@user.image, only_path: true)
          end
          render json: {data: @image, name: @userName}
        end

        def update_user
          @user = User.find_by_email(account_params[:email])

          if @user.update_attributes(account_params)
            render json: @user
          else
            render :json=> {errors: @user.errors}, :status=>422
          end
        end

        def destroy
          if @user.destroy
            render json: {}, status: 200
          else
            render :json=> {errors: @user.errors}, :status=>422
          end
        end

        private
        def user_params
            params.permit(:conversation_id )
        end

        def set_user
            @user = User.find(params[:id])
        end

        def account_params
          params.permit(  :first_name,
                          :last_name,
                          :email,
                          :image,
                          :password,
                          :password_confirmation)
        end
end
