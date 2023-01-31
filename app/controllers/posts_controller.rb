class PostsController < ApplicationController

  # GET to "/posts" route
  def index
    posts = Post.where(:user_id => current_user.id)
    render json: posts, status: :ok
  end

  # POST to "/posts" route
  def create
    post = Post.create!(post_params)
    render json: post, status: :created
  end

  # PATCH to "/posts/:id" route
  def update
    post = Post.find(params[:id])
    post.update!(post_params)
    render json: post, status: :accepted
  end

  # DELETE to "/posts/:id" route
  def destroy
    post = Post.find(params[:id])
    post.destroy
    head :no_content
  end

  private

  def post_params
    params.permit(:post_text, :mood, :user_id, :tag_id)
  end

end
