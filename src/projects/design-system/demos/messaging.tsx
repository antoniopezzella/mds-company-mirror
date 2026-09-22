import * as React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
} from '@/components/ui/message-scroller';
import { Message, MessageAvatar, MessageContent } from '@/components/ui/message';
import { Bubble, BubbleContent } from '@/components/ui/bubble';
import {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
} from '@/components/ui/attachment';
import { Avatar } from '@/components/ui/avatar';
import { Spinner } from '@/components/ui/spinner';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode } from '@/theme/ThemeModeContext';

export function ChatDemo() {
  const { mode } = useThemeMode();
  return (
    <div className="h-80 overflow-hidden rounded-lg border" style={{ borderColor: getRoleColor('border.default', { mode }) }}>
      <MessageScrollerProvider>
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent className="p-4">
              <MessageScrollerItem>
                <Message>
                  <MessageAvatar>
                    <Avatar initials="AI" size="small" tone="primary" />
                  </MessageAvatar>
                  <MessageContent>
                    <Bubble variant="muted">
                      <BubbleContent>Hi — I can help you review this policy. What would you like to know?</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
              <MessageScrollerItem>
                <Message align="end">
                  <MessageContent>
                    <Bubble>
                      <BubbleContent>What's the deductible on MB-0042?</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
              <MessageScrollerItem>
                <Message>
                  <MessageAvatar>
                    <Avatar initials="AI" size="small" tone="primary" />
                  </MessageAvatar>
                  <MessageContent>
                    <Bubble variant="muted">
                      <BubbleContent className="flex items-center gap-2">
                        <Spinner className="size-3" /> Checking policy MB-0042…
                      </BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            </MessageScrollerContent>
          </MessageScrollerViewport>
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  );
}

export function AttachmentDemo() {
  return (
    <AttachmentGroup>
      <Attachment state="done">
        <AttachmentMedia variant="icon">
          <FileText className="h-4 w-4" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Policy-MB-0042.pdf</AttachmentTitle>
          <AttachmentDescription>2.4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia variant="icon">
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>claim-photos.zip</AttachmentTitle>
          <AttachmentDescription>Uploading…</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia variant="icon">
          <AlertCircle className="h-4 w-4" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>certificate.docx</AttachmentTitle>
          <AttachmentDescription>Upload failed</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </AttachmentGroup>
  );
}
