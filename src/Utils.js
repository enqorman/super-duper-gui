/**
 * @param {Vec2d} posFirst
 * @param {Vec2d} posSecond
 * @param {Rectangle} rect 
 */
function collisionRect(posFirst, posSecond, rect) {
    // posFirst is Mouse
    // posSecond is the Placement of the Rect
    return (posFirst.getX() >= posSecond.getX() && posFirst.getX() <= posSecond.getX() + rect.getWidth()) &&
           (posFirst.getY() >= posSecond.getY() && posFirst.getY() <= posSecond.getY() + rect.getHeight());
}