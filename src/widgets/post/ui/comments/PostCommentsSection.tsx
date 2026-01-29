import { PostCommentCreateForm } from '@/features/post'

import { PostCommentList } from './list'

type Props = {
  postId: number
}

export const PostCommentsSection = ({ postId }: Props) => {
  return (
    <>
      <PostCommentCreateForm postId={postId} />

      <PostCommentList postId={postId} />
    </>
  )
}
