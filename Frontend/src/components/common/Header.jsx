
/**
 * Generic, reusable page header. Pages can render their own variant if needed.
 * Kept intentionally light — the dashboard uses its own richer DashboardHeader.
 */
const Header = ({ title, subtitle, actions, testId }) => {
  return (
    <header className=\"dh\" data-testid={testId}>
      <div className=\"dh-meta\">
        {subtitle && <small>{subtitle}</small>}
        <h1>{title}</h1>
      </div>
      {actions && <div className=\"dh-actions\">{actions}</div>}
    </header>
  );
};

export default Header;
"
Observation: Create successful: /app/frontend/src/components/common/Header.jsx