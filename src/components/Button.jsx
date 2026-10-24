export default function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  className = '',
  children,
  ...props
}) {
  const Tag = as
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()
  const typeProps = Tag === 'button' ? { type: props.type ?? 'button' } : {}

  return (
    <Tag className={classes} {...props} {...typeProps}>
      {Icon && <Icon className="btn__icon" size={18} aria-hidden="true" />}
      <span>{children}</span>
      {IconRight && <IconRight className="btn__icon" size={18} aria-hidden="true" />}
    </Tag>
  )
}
