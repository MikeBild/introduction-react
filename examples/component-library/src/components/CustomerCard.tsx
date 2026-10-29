import { Badge } from './Badge';
import { Button } from './Button';

// Übung react-composition: Jede neue Anforderung hat hier ein weiteres Flag
// hinzugefügt. Ersetze die Flags durch Slots (header, children, actions).
type CustomerCardProps = {
  title: string;
  subtitle?: string;
  showAvatar?: boolean;
  avatarUrl?: string;
  showBadge?: boolean;
  badgeText?: string;
  showActions?: boolean;
  showDeleteAction?: boolean;
  editLabel?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isCompact?: boolean;
};

export const CustomerCard = ({
  title,
  subtitle,
  showAvatar = false,
  avatarUrl,
  showBadge = false,
  badgeText = '',
  showActions = false,
  showDeleteAction = false,
  editLabel = 'Bearbeiten',
  onEdit,
  onDelete,
  isCompact = false,
}: CustomerCardProps) => (
  <div className={isCompact ? 'card card--compact' : 'card'}>
    {showAvatar && avatarUrl && (
      <img className="avatar" src={avatarUrl} alt="" />
    )}
    <h3>
      {title} {showBadge && <Badge>{badgeText}</Badge>}
    </h3>
    {subtitle && !isCompact && <p>{subtitle}</p>}
    {showActions && (
      <div className="card__footer">
        <Button onClick={onEdit}>{editLabel}</Button>
        {showDeleteAction && (
          <Button variant="secondary" onClick={onDelete}>
            Löschen
          </Button>
        )}
      </div>
    )}
  </div>
);
