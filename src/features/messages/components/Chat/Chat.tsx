import { MoreVertical, Phone, Send, Smile, Video } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { AvatarWithColorInitials, Typography } from '@/components/shared'
import { Button, Separator, Textarea } from '@/components/ui'
import { cn } from '@/utils'

type ChatMessage = {
  id: number
  side: 'me' | 'them'
  type: 'text' | 'image' | 'typing'
  text?: string
  time?: string
}

const messages: ChatMessage[] = [
  {
    id: 1,
    side: 'me',
    type: 'image',
    time: '5:36 PM'
  },
  {
    id: 2,
    side: 'them',
    type: 'text',
    text: 'Traveling alteration impression six all uncommonly chamber hearing private.'
  },
  {
    id: 3,
    side: 'them',
    type: 'typing'
  }
]

export const Chat = () => {
  const { id } = useParams()

  return (
    <section className="bg-card flex min-h-[70vh] flex-1 flex-col rounded-md border">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <AvatarWithColorInitials name="Judy Nguyen" size={48} />
          <div className="flex flex-col">
            <Typography.Title level={5} className="text-lg">
              Judy Nguyen
            </Typography.Title>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <span className="size-2 rounded-full bg-emerald-500" />
              Online
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="icon" className="rounded-full">
            <Phone className="size-4" />
            <span className="sr-only">Audio call</span>
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Video className="size-4" />
            <span className="sr-only">Video call</span>
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full">
            <MoreVertical className="size-4" />
            <span className="sr-only">More actions</span>
          </Button>
        </div>
      </header>

      <Separator />

      <div className="flex flex-1 flex-col gap-6 overflow-hidden px-6 py-5">
        <div className="text-muted-foreground text-center text-sm">
          Conversation ID: {id ?? '...'} · 2 new messages
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {messages.map((message) => {
            if (message.type === 'typing') {
              return (
                <div key={message.id} className="flex items-end gap-3">
                  <AvatarWithColorInitials name="Judy Nguyen" size={32} />
                  <div className="bg-muted flex items-center gap-1 rounded-2xl px-4 py-3">
                    <span className="bg-muted-foreground/60 size-2 animate-bounce rounded-full" />
                    <span className="bg-muted-foreground/60 size-2 animate-bounce rounded-full [animation-delay:120ms]" />
                    <span className="bg-muted-foreground/60 size-2 animate-bounce rounded-full [animation-delay:240ms]" />
                  </div>
                </div>
              )
            }

            const isMine = message.side === 'me'

            return (
              <div
                key={message.id}
                className={cn(
                  'flex w-full items-end gap-3',
                  isMine ? 'justify-end' : 'justify-start'
                )}
              >
                {!isMine && (
                  <AvatarWithColorInitials name="Judy Nguyen" size={32} />
                )}

                <div className="flex max-w-[70%] flex-col gap-1">
                  {message.type === 'image' ? (
                    <div className="bg-muted/70 h-36 w-60 overflow-hidden rounded-2xl">
                      <div className="from-primary/30 to-primary/5 h-full w-full bg-gradient-to-br" />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        'rounded-2xl px-4 py-3 text-sm leading-relaxed',
                        isMine
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      )}
                    >
                      {message.text}
                    </div>
                  )}
                  {message.time && (
                    <span
                      className={cn(
                        'text-muted-foreground text-xs',
                        isMine ? 'text-right' : 'text-left'
                      )}
                    >
                      {message.time}
                    </span>
                  )}
                </div>

                {isMine && <AvatarWithColorInitials name="You" size={32} />}
              </div>
            )
          })}
        </div>
      </div>

      <Separator />

      <footer className="flex items-end gap-3 px-6 py-4">
        <Textarea
          className="min-h-[48px] resize-none"
          placeholder="Type a message"
        />
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="icon">
            <Smile className="size-4" />
            <span className="sr-only">Add emoji</span>
          </Button>
          <Button variant="secondary" size="icon">
            <span className="text-sm font-semibold">+</span>
            <span className="sr-only">Attach file</span>
          </Button>
          <Button size="icon">
            <Send className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </footer>
    </section>
  )
}
