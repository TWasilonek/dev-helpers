import React, { SFC, Fragment } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import classNames from 'classnames';

interface Props {
  className?: string,
  header?: string,
  text?: string,
  clipboardText?: string,
  placeholder?: string,
  onCopy?: (a: string, b: boolean) => void,
  outputTestId?: string,
 };

 const InlineStyle = () => (
  <style>
    {`
    .ui.message.result {
      width: 100%;
      position: relative;
      margin: 1rem;
      min-height: 6rem;
    }
    .ui.message.result pre {
      white-space: pre-wrap;
      word-break: break-word;
    }
    .ui.message.result pre.placeholder {
      color: #c5c5c5;
    }
    .ui.message.result .copy {
      position: absolute;
      right: .7em;
      top: .7em;
      margin: 0;
      cursor: pointer;
      font-size: 1.2em;
    }
  `}
  </style>
);

const Result: SFC<Props> = ({
  className = '',
  header = '',
  text = '',
  clipboardText = '',
  placeholder = '',
  onCopy,
  outputTestId,
  ...otherProps
}) => {
  return (
    <Fragment>
      <InlineStyle />

      <Message
        className={classNames('result', className)}
        data-testid="result"
        {...otherProps}
      >
        <CopyToClipboard
          text={clipboardText || text}
          onCopy={onCopy}
          data-testid="clipboard-text"
        >
          <Icon name="copy outline" className="copy" />
        </CopyToClipboard>
        <Message.Header data-testid="result-header">{header}</Message.Header>
        {text ? (
          <pre data-testid={outputTestId || "result-output"}>{text}</pre>
        ) : (
          <pre data-testid="result-placeholder" className="placeholder">{placeholder}</pre>
        )}
      </Message>
    </Fragment>
  );
}

export default Result;
