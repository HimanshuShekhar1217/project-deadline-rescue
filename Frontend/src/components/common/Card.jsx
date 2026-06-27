import React from "react";

/**
 * Base card wrapper for every dashboard card.
 * Usage:
 *   <Card title="Today's Tasks" icon={<ClipboardList size={14}/>} action={<a>View all</a>}>
 *     ...content...
 *   </Card>
 */
const Card = ({ title, icon, action, className = "", children, testId, style }) => {
  return (
    <section
      className={`card ${className}`}
      data-testid={testId}
      style={style}
    >
      {(title || action) && (
        <div className="hdr-row">
          {title && (
            <h3>
              {icon && <span className="ico">{icon}</span>}
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  );
};

export default Card;
