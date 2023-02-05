class TagsController < ApplicationController

  # GET to "/tags" route
  def index
    render json: user_tags#, serializer: TagWithPostsSerializer, status: :ok
  end

  # GET to "/tags/:id" route
  def show
    tag = user_tags.find(params[:id])
    render json: tag, serializer: TagWithPostsSerializer
  end

  # POST to "/tags" route
  def create
    tag = Tag.create!(user_id: current_user.id, tag_name: params[:tag_name])
    render json: tag, status: :created
  end

  # PATCH to "/tags/:id" route
  def update
    tag = user_tags.find(params[:id])
    tag.update!(tag_params)
    render json: tag, status: :accepted
  end

  # DELETE to "/tags/:id" route
  def destroy
    tag = user_tags.find(params[:id])
    tag.destroy
    head :no_content
  end

  private

  def tag_params
    params.permit(:tag_name, :user_id)
  end

  def user_tags
    Tag.where(:user_id => current_user.id)
  end

end
