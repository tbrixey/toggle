import React, { Component } from "react";
import styles from "../styles/Toggle.module.css";
import Countdown from "react-countdown-now";

const renderer = ({ minutes, seconds, milliseconds, completed }: any) => {
  if (completed) {
    // Render a completed state
    return null;
  } else {
    let render;
    // Render a countdown\
    const myMilli = (
      <span
        style={{
          fontSize: 16,
          bottom: "0.1rem",
        }}
      >
        {milliseconds > 99 ? milliseconds : "0" + milliseconds}
      </span>
    );
    const mySeconds = (
      <span
        style={{
          fontSize: 24,
        }}
      >
        {seconds}
      </span>
    );
    const myAltSeconds = (
      <span
        style={{
          fontSize: 16,
        }}
      >
        {seconds}
      </span>
    );
    render = (
      <div>
        {mySeconds} {myMilli}
      </div>
    );
    return <div>{render}</div>;
  }
};

export default class TheToggle extends Component<any, any> {
  render() {
    const time = Date.now() + this.props.toggleTime;
    return (
      <div className={styles.wrapper} id="bg">
        {this.props.checked ? (
          <div
            style={{
              color: "white",
              width: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Countdown
              date={time}
              renderer={renderer}
              intervalDelay={0}
              precision={3}
              onComplete={this.props.handleComplete}
            />
          </div>
        ) : null}

        <label>
          <div>
            <input
              type="checkbox"
              id="checker"
              name="check-guy"
              onChange={this.props.handleCheck}
              checked={this.props.checked}
              className={styles.input}
              disabled={this.props.checked}
            />
            <div className={styles["ht-ui-check"]}>
              <div className={styles.track}>
                <div className={styles.inner} />
              </div>
              <div className={styles.handle}>
                <div className={styles.faces}>
                  <div className={styles.sad}>
                    <div className={styles.eyes}>
                      <div>+ </div>
                      <div>+</div>
                    </div>
                    <div className={styles.mouth}>—</div>
                  </div>
                  <div className={styles.happy}>
                    <div className={styles.eyes}> ◠ ◠ </div>
                    <div className={styles.mouth}>
                      <span>◗</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
    );
  }
}
